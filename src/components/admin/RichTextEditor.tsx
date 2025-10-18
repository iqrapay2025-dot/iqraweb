import { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image as ImageIcon,
  Code,
  Quote,
  Undo,
  Redo,
  Type
} from 'lucide-react';
import { Button } from '../ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder = 'Write your blog post content here...' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFontSize, setSelectedFontSize] = useState('16px');
  const [selectedFontFamily, setSelectedFontFamily] = useState('inherit');
  
  // Undo/Redo history management
  const [history, setHistory] = useState<string[]>([value || '']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isUndoRedoRef = useRef(false);

  // Initialize editor content only once
  useEffect(() => {
    if (editorRef.current && value && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      setHistory([value]);
      setHistoryIndex(0);
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current && !isUndoRedoRef.current) {
      const newContent = editorRef.current.innerHTML;
      onChange(newContent);
      
      // Add to history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newContent);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    isUndoRedoRef.current = false;
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      isUndoRedoRef.current = true;
      const newIndex = historyIndex - 1;
      const previousContent = history[newIndex];
      
      if (editorRef.current) {
        editorRef.current.innerHTML = previousContent;
      }
      
      setHistoryIndex(newIndex);
      onChange(previousContent);
      toast.success('Undo');
    } else {
      toast.info('Nothing to undo');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoRef.current = true;
      const newIndex = historyIndex + 1;
      const nextContent = history[newIndex];
      
      if (editorRef.current) {
        editorRef.current.innerHTML = nextContent;
      }
      
      setHistoryIndex(newIndex);
      onChange(nextContent);
      toast.success('Redo');
    } else {
      toast.info('Nothing to redo');
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handleFontSizeChange = (size: string) => {
    setSelectedFontSize(size);
    
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = size;
      
      try {
        const contents = range.extractContents();
        span.appendChild(contents);
        range.insertNode(span);
        
        // Clear selection
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (e) {
        console.error('Could not apply font size:', e);
      }
      handleInput();
    }
  };

  const handleFontFamilyChange = (font: string) => {
    setSelectedFontFamily(font);
    executeCommand('fontName', font);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      insertImage(imageUrl);
      toast.success('Image uploaded successfully');
    };
    reader.onerror = () => {
      toast.error('Failed to upload image');
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };

  const insertImage = (url: string) => {
    const img = `<img src="${url}" alt="Blog image" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px;" />`;
    executeCommand('insertHTML', img);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const formatBlock = (tag: string) => {
    executeCommand('formatBlock', tag);
  };

  const fontSizes = [
    { label: 'Small', value: '12px' },
    { label: 'Normal', value: '16px' },
    { label: 'Large', value: '20px' },
    { label: 'Extra Large', value: '24px' },
    { label: 'Huge', value: '32px' },
  ];

  const fontFamilies = [
    { label: 'Default', value: 'inherit' },
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Times New Roman', value: 'Times New Roman, serif' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Courier New', value: 'Courier New, monospace' },
    { label: 'Verdana', value: 'Verdana, sans-serif' },
    { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
  ];

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 dark:bg-gray-800 p-1.5 sm:p-2 flex flex-wrap gap-1 items-center">
        {/* Text Formatting */}
        <div className="flex gap-1 sm:border-r sm:pr-2 sm:mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('bold')}
            title="Bold (Ctrl+B)"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <Bold className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('italic')}
            title="Italic (Ctrl+I)"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <Italic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('underline')}
            title="Underline (Ctrl+U)"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <Underline className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Font Size - Hidden on mobile, shown on larger screens */}
        <div className="hidden md:flex items-center gap-2 border-r pr-2 mr-2">
          <Type className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedFontSize} onValueChange={handleFontSizeChange}>
            <SelectTrigger className="h-8 w-[100px] lg:w-[120px]">
              <SelectValue placeholder="Font Size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Font Family - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:flex items-center gap-2 border-r pr-2 mr-2">
          <Select value={selectedFontFamily} onValueChange={handleFontFamilyChange}>
            <SelectTrigger className="h-8 w-[120px] xl:w-[140px]">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Alignment - Visible on all screens */}
        <div className="flex gap-1 sm:border-r sm:pr-2 sm:mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('justifyLeft')}
            title="Align Left"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <AlignLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('justifyCenter')}
            title="Align Center"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <AlignCenter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('justifyRight')}
            title="Align Right"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <AlignRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Lists - Visible on all screens */}
        <div className="flex gap-1 sm:border-r sm:pr-2 sm:mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('insertUnorderedList')}
            title="Bullet List"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('insertOrderedList')}
            title="Numbered List"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <ListOrdered className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Block Formats - Hidden on small mobile */}
        <div className="hidden xs:flex gap-1 sm:border-r sm:pr-2 sm:mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatBlock('blockquote')}
            title="Quote"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <Quote className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatBlock('pre')}
            title="Code Block"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <Code className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Links & Images - Visible on all screens */}
        <div className="flex gap-1 sm:border-r sm:pr-2 sm:mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={insertLink}
            title="Insert Link"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <Link className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            title="Upload Image"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Undo/Redo - Visible on all screens */}
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleUndo}
            disabled={!canUndo}
            title="Undo"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <Undo className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${!canUndo ? 'opacity-50' : ''}`} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRedo}
            disabled={!canRedo}
            title="Redo"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <Redo className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${!canRedo ? 'opacity-50' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[250px] sm:min-h-[350px] lg:min-h-[400px] p-3 sm:p-4 focus:outline-none prose prose-sm max-w-none dark:prose-invert"
        style={{ 
          fontFamily: selectedFontFamily,
          fontSize: selectedFontSize,
          direction: 'ltr',
          unicodeBidi: 'embed'
        }}
        suppressContentEditableWarning
      />

      {/* Helper Text */}
      <div className="border-t bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-2 text-xs text-muted-foreground">
        <p className="hidden sm:block">💡 <strong>Tip:</strong> Click the image icon to upload images (max 2MB). Use Undo/Redo buttons for mobile or keyboard shortcuts (Ctrl+Z/Ctrl+Y).</p>
        <p className="sm:hidden">💡 Tap image icon to upload (max 2MB). Use Undo/Redo buttons.</p>
      </div>
    </div>
  );
}
