document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendar');
    const tabs = document.querySelectorAll('.tab');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Updated festivals data
    const festivals = {
        '2024-01-01': 'New Year\'s Day',
        '2024-01-13': 'Lohri',
        '2024-01-14': 'Makar Sankranti',
        '2024-01-15': 'Pongal',
        '2024-01-17': 'Guru Govind Singh Jayanti',
        '2024-01-25': 'Hazarat Ali\'s Birthday',
        '2024-01-26': 'Republic Day',
        '2024-02-14': 'Vasant Panchami',
        '2024-02-19': 'Shivaji Jayanti',
        '2024-02-24': 'Guru Ravidas Jayanti',
        '2024-03-06': 'Maharishi Dayanand Saraswati Jayanti',
        '2024-03-08': 'Maha Shivaratri/Shivaratri',
        '2024-03-12': 'Ramadan Start',
        '2024-03-24': 'Holika Dahana',
        '2024-03-25': 'Dolyatra, Holi',
        '2024-03-29': 'Good Friday',
        '2024-03-31': 'Easter Day',
        '2024-04-05': 'Jamat Ul-Vida (tentative)',
        '2024-04-09': 'Gudi Padwa, Ugadi, Chaitra Sukhladi',
        '2024-04-10': 'Ramzan Id/Eid-ul-Fitar',
        '2024-04-11': 'Ramzan Id/Eid-ul-Fitar',
        '2024-04-13': 'Vaisakhi',
        '2024-04-14': 'Ambedkar Jayanti, Mesadi / Vaisakhadi',
        '2024-04-17': 'Rama Navami',
        '2024-04-21': 'Mahavir Jayanti',
        '2024-05-08': 'Birthday of Rabindranath',
        '2024-05-23': 'Buddha Purnima/Vesak',
        '2024-06-17': 'Bakrid/Eid ul-Adha',
        '2024-07-07': 'Rath Yatra',
        '2024-07-17': 'Muharram/Ashura',
        '2024-08-15': 'Parsi New Year, Independence Day',
        '2024-08-19': 'Raksha Bandhan (Rakhi)',
        '2024-08-26': 'Janmashtami (Smarta), Janmashtami',
        '2024-09-07': 'Ganesh Chaturthi/Vinayaka Chaturthi',
        '2024-09-15': 'Onam',
        '2024-09-16': 'Milad un-Nabi/Id-e-Milad (tentative)',
        '2024-10-02': 'Mahatma Gandhi Jayanti',
        '2024-10-03': 'First Day of Sharad Navratri',
        '2024-10-09': 'First Day of Durga Puja Festivities',
        '2024-10-10': 'Maha Saptami',
        '2024-10-11': 'Maha Ashtami, Maha Navami',
        '2024-10-12': 'Dussehra',
        '2024-10-17': 'Maharishi Valmiki Jayanti',
        '2024-10-20': 'Karaka Chaturthi (Karva Chauth)',
        '2024-10-31': 'Diwali/Deepavali, Naraka Chaturdasi',
        '2024-11-02': 'Govardhan Puja',
        '2024-11-03': 'Bhai Duj',
        '2024-11-07': 'Chhat Puja (Pratihar Sashthi/Surya Sashthi)',
        '2024-11-15': 'Guru Nanak Jayanti',
        '2024-11-24': 'Guru Tegh Bahadur\'s Martyrdom Day',
        '2024-12-24': 'Christmas Eve',
        '2024-12-25': 'Christmas'
    };

    function generateCalendar(year, month) {
        calendarContainer.innerHTML = '';

        // Add days of the week
        daysOfWeek.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = day;
            calendarContainer.appendChild(dayDiv);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add empty cells before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('date');
            calendarContainer.appendChild(emptyDiv);
        }

        // Add dates with potential festivals
        for (let date = 1; date <= daysInMonth; date++) {
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date');
            dateDiv.textContent = date;

            const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
            if (festivals[fullDate]) {
                dateDiv.setAttribute('data-festival', festivals[fullDate]);
            }

            calendarContainer.appendChild(dateDiv);
        }
    }

    function handleTabClick(event) {
        const month = parseInt(event.target.getAttribute('data-month'));
        generateCalendar(2024, month);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });

    // Initialize with the first month's calendar
    generateCalendar(2024, 0);
});
