document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const htmlInput = document.getElementById('html-input');
    const previewScreen = document.getElementById('preview-screen');
    
    // --- Control Inputs ---
    const colorPicker = document.getElementById('color-picker');
    const bgColorPicker = document.getElementById('bg-color-picker');
    const fontSize = document.getElementById('font-size');
    const padding = document.getElementById('padding');
    const borderRadius = document.getElementById('border-radius');
    const alignButtons = document.querySelectorAll('button[data-style="textAlign"]');
    const boldBtn = document.getElementById('bold-btn');
    const italicBtn = document.getElementById('italic-btn');

    // --- Labels for Values ---
    const fsVal = document.getElementById('fs-val');
    const pdVal = document.getElementById('pd-val');
    const brVal = document.getElementById('br-val');

    // --- CSS Modal Elements ---
    const modal = document.getElementById('css-modal');
    const getCssBtn = document.getElementById('get-css-btn');
    const closeBtn = document.querySelector('.close');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    // --- State Variables ---
    let isBold = false;
    let isItalic = false;

    // 1. Function: Render HTML to Preview
    function updateHTML() {
        previewScreen.innerHTML = htmlInput.value;
    }

    // 2. Function: Update Visual Styles
    function updateStyles() {
        // Apply styles to the preview container
        previewScreen.style.color = colorPicker.value;
        previewScreen.style.backgroundColor = bgColorPicker.value;
        previewScreen.style.fontSize = `${fontSize.value}px`;
        previewScreen.style.padding = `${padding.value}px`;
        previewScreen.style.borderRadius = `${borderRadius.value}px`;
        
        // Update the text numbers next to sliders
        fsVal.textContent = fontSize.value;
        pdVal.textContent = padding.value;
        brVal.textContent = borderRadius.value;
    }

    // --- Event Listeners ---

    // Real-time updates
    htmlInput.addEventListener('input', updateHTML);
    colorPicker.addEventListener('input', updateStyles);
    bgColorPicker.addEventListener('input', updateStyles);
    fontSize.addEventListener('input', updateStyles);
    padding.addEventListener('input', updateStyles);
    borderRadius.addEventListener('input', updateStyles);

    // Text Alignment Buttons
    alignButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            alignButtons.forEach(b => b.style.background = '#f9f9f9');
            // Add active style to clicked
            btn.style.background = '#ccc';
            previewScreen.style.textAlign = btn.getAttribute('data-value');
        });
    });

    // Bold Button Logic
    boldBtn.addEventListener('click', () => {
        isBold = !isBold;
        previewScreen.style.fontWeight = isBold ? 'bold' : 'normal';
        boldBtn.style.background = isBold ? '#ccc' : '#f9f9f9';
    });

    // Italic Button Logic
    italicBtn.addEventListener('click', () => {
        isItalic = !isItalic;
        previewScreen.style.fontStyle = isItalic ? 'italic' : 'normal';
        italicBtn.style.background = isItalic ? '#ccc' : '#f9f9f9';
    });

    // --- CSS Generation & Export ---

    getCssBtn.addEventListener('click', () => {
        const styles = `
.styled-content {
    color: ${colorPicker.value};
    background-color: ${bgColorPicker.value};
    font-size: ${fontSize.value}px;
    padding: ${padding.value}px;
    border-radius: ${borderRadius.value}px;
    text-align: ${previewScreen.style.textAlign || 'left'};
    font-weight: ${isBold ? 'bold' : 'normal'};
    font-style: ${isItalic ? 'italic' : 'normal'};
}`;
        cssOutput.value = styles.trim();
        modal.style.display = 'flex';
    });

    // Close Modal Logic
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    };

    // Copy to Clipboard (Modern Method)
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(cssOutput.value);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.background = '#28a745'; // Green color
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '#333'; // Reset color
            }, 2000);
        } catch (err) {
            alert('Failed to copy text: ' + err);
        }
    });

    // Initialize on Load
    updateHTML();
    updateStyles();
});