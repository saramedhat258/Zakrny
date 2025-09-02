const AllAzkar=document.querySelector('.features .container')
const azkarTitle=document.querySelector('.features .landing p')

const azkarTitles = {
    'morning-azkar': 'أذكار الصباح',
    'evening-azkar': 'أذكار المساء',
    'sleeping-azkar': 'أذكار النوم',
    'after-salah-azkar': 'أذكار بعد الصلاة',
    'tasabeh': 'تسابيح',
    'dua': 'أدعية الأنبياء'
};

const fetchAzkar=(id)=>{
    fetch(`https://68b6dffc73b3ec66cec2ffd6.mockapi.io/zakrny/all`)
    .then(res=>res.json())
    .then(data=>{
        const allData=data[0]
        const zekrData=allData[id]
        console.log(zekrData)
        zekrData.map(zekr=>{
            const arabicTitle = azkarTitles[zekr.category]
            azkarTitle.innerHTML=arabicTitle
            let zekrstyle;
            const formattedContent = zekr.content.replace(/\\n/g, '<br>');
            if(zekr.count==="1"){
                if(zekr.description!==""){
                    zekrstyle=`
                        <div class="zekr-desc">
                            <p>${formattedContent}</p>
                            <hr class="divider">
                            <div class="desc">
                                ${zekr.description}
                            </div>
                        </div>
                    `
                }else{
                    zekrstyle=`
                    <div class="zekr">
                        <p>${formattedContent}</p>
                    </div>
                `
                }
                }
            else{
                if(zekr.description!==""){
                    zekrstyle=`
                        <div class="zekr-desc">
                            <div class="zekrcontent">
                                <p>${formattedContent}</p>
                                <span class="counter">${zekr.count}</span>
                            </div>
                            <hr class="divider">
                            <div class="desc">
                                ${zekr.description}
                            </div>
                        </div>
                    `
                }else{
                    zekrstyle=`
                        <div class="zekr">
                            <p>${formattedContent}</p>
                            <span class="counter"> ${zekr.count}</span>
                        </div>
                        `
                }
            }
            AllAzkar.innerHTML+=zekrstyle
        })
    })
}

const urlParams = new URLSearchParams(window.location.search);
const azkarId = urlParams.get('id');
if (azkarId) {
    fetchAzkar(azkarId);
} else {
    console.log('لم يتم تحديد نوع الأذكار');
    console.log(azkarId)
}
