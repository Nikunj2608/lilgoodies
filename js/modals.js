// ========== ADDITIONAL MODAL FUNCTIONALITY ==========

// This file handles additional modal interactions and animations

// Stagger animation for item cards
document.addEventListener('DOMContentLoaded', () => {
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
    
    // Add hover sound effect (visual feedback)
    itemCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
    
    // Parallax effect on shipping label
    const label = document.querySelector('.shipping-label');
    if (label) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 80;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 80;
            label.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        document.addEventListener('mouseleave', () => {
            label.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
});

// Drag and drop for photo upload
document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('photoUploadArea');
    if (!uploadArea) return;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.style.borderColor = '#a0422a';
            uploadArea.style.background = 'rgba(160, 66, 42, 0.05)';
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.style.borderColor = '';
            uploadArea.style.background = '';
        });
    });
    
    uploadArea.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('photoPreview').src = ev.target.result;
                document.getElementById('photoPreviewContainer').style.display = 'block';
            };
            reader.readAsDataURL(files[0]);
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to add item when modal is open
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            const addBtn = activeModal.querySelector('.btn-add');
            if (addBtn) addBtn.click();
        }
    }
});