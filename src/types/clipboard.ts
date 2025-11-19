/**
 * Copy text to clipboard with fallback support
 * Handles cases where Clipboard API is blocked by permissions policy
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Silently fall through to fallback method - no need to log
      // This is expected behavior when Clipboard API is blocked
    }
  }

  // Fallback to execCommand method
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make it invisible and non-interactive
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      return true;
    }
    
    // Only log error if fallback also fails
    console.error('Both clipboard methods failed');
    return false;
  } catch (err) {
    console.error('Both clipboard methods failed:', err);
    return false;
  }
}