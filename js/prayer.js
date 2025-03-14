function convertTo12HourFormat(time) {
    let [hours, minutes] = time.split(':');
    if (hours >= 12) {
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (hours === '00') {
        hours = '12';
    }
    return `${hours}:${minutes}`;
}

//fetch prayers 
function fetchPrayerTimes() {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    if (!city || !country) {
        alert('الرجاء إدخال المدينة والدولة');
        return;
    }
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`)
        .then(response => response.json())
        .then(data => {
            const timings = data.data.timings;
            const hijriDate = data.data.date.hijri;
            const gregorianDate = data.data.date.gregorian;
            const prayers = [
                { name: 'الفجر', time: timings.Fajr },
                { name: 'الشروق', time: timings.Sunrise },
                { name: 'الظهر', time: timings.Dhuhr },
                { name: 'العصر', time: timings.Asr },
                { name: 'المغرب', time: timings.Maghrib },
                { name: 'العشاء', time: timings.Isha },
            ]
            //التاريخ الهجري
            const formattedHijriDate = `${hijriDate.day} ${hijriDate.month.ar} ${hijriDate.year}`;
            // التاريخ الميلادي
            const formattedGregorianDate = `${gregorianDate.day} ${gregorianDate.month.en} ${gregorianDate.year}`;
            document.querySelector('#daycontainer').innerHTML=`
            <div class="day">
                <p>اليوم</p>
                <div class="hijri-date">${formattedHijriDate}</div>
                <div class="gre-date">${formattedGregorianDate}</div>
            </div>
        `
            // عرض أوقات الصلاة
            document.querySelector('.prayer-time').innerHTML = `
                    ${prayers.map(p => `
                        <div class="pry-time">
                            <div class="name">${p.name}</div>
                            <div class="time">${convertTo12HourFormat(p.time)}</div>
                        </div>
                    `).join('')}
                `
                })
                .catch(error => {
                    alert('حدث خطأ أثناء جلب أوقات الصلاة. الرجاء المحاولة مرة أخرى.');
                });
}

document.querySelector('.search').addEventListener('click', function (event) {
    event.preventDefault(); 
    fetchPrayerTimes(); 
});
