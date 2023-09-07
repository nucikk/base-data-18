//? TASK-1: https://reqres.in/api/unknown მოცემული ლინკიდან წამოიღეთ xml-ით name + color;

async function fetchColorData() {
    const loadingAnimationContainer = document.getElementById('loadingAnimation');
    const dataList = document.getElementById('colorDataList');
    const errorContainer = document.createElement('div'); 
  
    //* load and play the animation
    const animation = lottie.loadAnimation({
      container: loadingAnimationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'animation_loading.json', //* animation JSON file
    });
  
    document.body.style.overflowY = 'hidden'; //* hide vertical scrollbar
  
    setTimeout(async () => {
      try {
        const response = await fetch('https://reqres.in/api/unknown')  //* მონაცემების წამოღება  (Fetch data API)
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`); //* შეამოწმებს სწორად მიიღო მონაცემები თუ არა მაშინ დაბეჭდავს ერორის სტატუს კოდს
        const { data } = await response.json() //JSONდან ამოღებულია data 
  
        //* Stop and hide the loading animation
        animation.stop();
        loadingAnimationContainer.style.display = 'none';
        errorContainer.innerHTML = '';
        //* მომნაცემების ამოღება forEach მეთოდით, 
        //* 1.ელმენეტების შექმნა/ჩამატება ლისტში
        //* 2.background ფერის მინიჭება data წამორებული ფერებით
        //* 3. მონაცენების დაბეჭდვა
        data.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = `Name: ${item.name}, Color: ${item.color}`;
          listItem.style.backgroundColor = item.color;
          dataList.appendChild(listItem);
        });
      } catch (error) {
        errorContainer.textContent = `${error.message}`;
        errorContainer.style.color = 'red';
        dataList.appendChild(errorContainer);
        console.error('Error:', error);
      }
    }, 3000); //*timer 30 second(3000)
  }
  
  fetchColorData();
  