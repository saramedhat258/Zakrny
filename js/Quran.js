let selectSurah = document.querySelector(".verse-name")
let ayahsOFsurah=document.querySelector(".surah")
let audio=document.querySelector(".audio")

const loadAllSurah = () => {
    fetch("https://api.alquran.cloud/v1/surah")
        .then(res => res.json())
        .then(data => {
            let surah = data.data
            selectSurah.innerHTML = `
            <option value='' selected disabled>اختر سورة</option>
            ${surah.map(s => (
                    `<option value=${s.number}>${s.name}</option>`
                )).join("")}
            `
        })
}
const chooseSurah=(surahNumber)=>{
    fetch(`https://equran.id/api/surat/${surahNumber}`)
    .then(res=>res.json()
    .then(data=>{
        const surahAyat=data.ayat
        ayahsOFsurah.innerHTML=`
                <div class="ayahsOFsurah">
                    ${surahNumber!==9 ?`<div class="basmala">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</div>`:''}
                    ${
                    surahAyat.map(sa=>(
                        
                        `<p class="aya">${sa.ar}<span class="aya_num">${sa.nomor}</span></p>`
                    )).join("")
                    }
                </div>
                `
        const audioURL=`https://server8.mp3quran.net/afs/${surahNumber.toString().padStart(3, '0')}.mp3`;
        audio.innerHTML=`
                    <audio controls class="audio-player">
                        <source src="${audioURL}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
        `
        
    })
)
}


window.addEventListener('load', loadAllSurah)
selectSurah.addEventListener('change',e=>{
    const n=Number(e.target.value.replace(/{|}/g, ''))
    chooseSurah(n)

})
