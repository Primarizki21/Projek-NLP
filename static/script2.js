let openDropdown = null;

function toggleDropdown(type) {
    const dropdown = document.getElementById(type + '-options');
    const selected = dropdown.previousElementSibling;
    
    // Close other dropdowns
    if (openDropdown && openDropdown !== dropdown) {
        openDropdown.classList.add('select-hide');
        openDropdown.previousElementSibling.classList.remove('select-arrow-active');
    }
    
    // Toggle current dropdown
    if (dropdown.classList.contains('select-hide')) {
        dropdown.classList.remove('select-hide');
        selected.classList.add('select-arrow-active');
        openDropdown = dropdown;
    } else {
        dropdown.classList.add('select-hide');
        selected.classList.remove('select-arrow-active');
        openDropdown = null;
    }
}

function selectOption(type, value, displayText) {
    const hiddenInput = document.getElementById(type);
    const selected = document.getElementById(type + '-options').previousElementSibling;
    const dropdown = document.getElementById(type + '-options');
    
    hiddenInput.value = value;
    selected.innerHTML = displayText;
    selected.classList.remove('select-arrow-active');
    dropdown.classList.add('select-hide');
    openDropdown = null;
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-select')) {
        if (openDropdown) {
            openDropdown.classList.add('select-hide');
            openDropdown.previousElementSibling.classList.remove('select-arrow-active');
            openDropdown = null;
        }
    }
});

function handleSubmit(event) {
    event.preventDefault();
    
    const difficulty = document.getElementById('difficulty').value;
    const part = document.getElementById('part').value;
    
    if (!difficulty || !part) {
        alert('Silakan pilih tingkat kesulitan dan jenis masakan!');
        return;
    }
    
    // Show selected options
    alert(`Pilihan Anda:\nTingkat: ${difficulty}\nMakanan: ${part}\n\nGame akan dimulai!`);
    
    console.log('Selected difficulty:', difficulty);
    console.log('Selected part:', part);
    
    // Here you would typically redirect to the game page
    // window.location.href = `/game?difficulty=${difficulty}&part=${part}`;
}
