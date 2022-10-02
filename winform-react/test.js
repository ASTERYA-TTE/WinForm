
const data = {
    options: [
        {
            name: 'column',
            value:'asd'
        },
        {
            name: 'label'
        }, 
        {
            title: 'title'
        }
    ]
}


let result = data.options.find(option => option.name === 'column');

if (result) {
    console.log(result.value);
} else {
    console.log('sonuc bulunamadı')
}