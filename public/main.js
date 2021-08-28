

    const name = select('#name').value.trim();
    //trim baştaki boşlukları kaldırmayı sağlar böylece boşluk tuşuyla oluşturulan içerikler boş olarak 
    //değerlendirilir.
    const cuisine=select('#cuisine').value;
    const time=parseInt(select('#time').value);
    const video_value=select('#video').value;
    const image_value = select('#image').value;
    const recipe = select('#recipe').value.trim();
    const malzemeler=select('#ingredients').selectedOptions;
    const ingredients=Array.from(malzemeler).map(({ value }) => value);

    const image=image_value.split('\\').pop();
    const video=video_value.split('\\').pop();

    

    

