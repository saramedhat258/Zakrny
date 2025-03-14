const zekrType=document.querySelectorAll('.features .container a')

zekrType.forEach(zekr=>{
    zekr.addEventListener('click',e=>{
        e.preventDefault()
        const linkId=e.currentTarget.id
        console.log(linkId)
        switch (linkId) {
            case 'morning-azkar':
                window.location.href = `../html/mini-athkar.html?id=${linkId}`;
                break;
            case 'evening-azkar':
                window.location.href = `../html/mini-athkar.html?id=${linkId}`;
                break;
            case 'sleeping-azkar':
                window.location.href = `../html/mini-athkar.html?id=${linkId}`;
                break;
            case 'after-salah-azkar':
                window.location.href = `../html/mini-athkar.html?id=${linkId}`;
                break;
            case 'tasabeh':
                window.location.href = `../html/mini-athkar.html?id=${linkId}`;
                break;
            case 'dua':
                window.location.href = `../html/mini-athkar.html?id=${linkId}`;
                break;
            default:
                alert('الرابط غير معروف');
        }
    })
})