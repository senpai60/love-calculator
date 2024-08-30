document.addEventListener('DOMContentLoaded', function() {
    // Populate year options dynamically
    const yearSelects = document.querySelectorAll('select[id$="year1"], select[id$="year2"]');
    const currentYear = new Date().getFullYear();
    const startYear = 1960;

    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelects.forEach(select => select.appendChild(option.cloneNode(true)));
    }
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Extract names and birth details
    const name1 = document.getElementById('name1').value.toLowerCase();
    const name2 = document.getElementById('name2').value.toLowerCase();
    const month1 = document.getElementById('month1').value;
    const month2 = document.getElementById('month2').value;
    const year1 = document.getElementById('year1').value;
    const year2 = document.getElementById('year2').value;

    // Simple compatibility calculation based on combined name values
    const combinedValue = (name1 + name2 + month1 + month2 + year1 + year2).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const compatibility = Math.floor((combinedValue % 100) + 30);

    let heading = '';
    
    if (compatibility < 50) {
        heading = 'Bad';
    } else if (compatibility < 70) {
        heading = 'Normal';
    } else {
        heading = 'Best';
    }
    
    // Show popup
    const popupCard = document.getElementById('resultPopup');
    document.getElementById('resultHeading').textContent = heading;
    document.getElementById('compatibilityResult').textContent = `Your compatibility score is ${compatibility}%`;
    popupCard.classList.remove('popup-hidden');
    
    // Reset button functionality
    document.getElementById('resetBtn').addEventListener('click', function() {
        document.querySelector('form').reset();
        popupCard.classList.add('popup-hidden');
    });
});
