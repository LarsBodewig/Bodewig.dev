function yearsElapsed(dateString, localeString) {
    const elapsedMillis = Date.now() - Date.parse(dateString);
    const elapsedYears = elapsedMillis / 1000 / 60 / 60 / 24 / 365; // approximation without leaps
    const roundoffYears = Math.round(elapsedYears * 10 / 5) / 10 * 5; // round to nearest .5
    return new Number(roundoffYears).toLocaleString(localeString) + "+";
}

function setExperience() {
    const elements = document.querySelectorAll("[data-experience]");
    elements.forEach(element => {
        const experience = element.dataset.experience;
        const locale = element.dataset.experienceLocale;
        const value = yearsElapsed(experience, locale);
        element.textContent = value;
    });
}

addEventListener('DOMContentLoaded', setExperience)
