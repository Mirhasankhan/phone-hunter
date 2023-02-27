const loadPhone = (searchedPhone,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchedPhone}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data.data, dataLimit))
};

const showPhones =( phones,dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length>10){
      phones = phones.slice(0,10)
      showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }
    // show messeage if no phone found
    if(phones.length == 0){
      document.getElementById('warning').classList.remove('d-none');
    }  
    else{
      document.getElementById('warning').classList.add('d-none')
    }
    // find every phone
    phones.forEach(phone => {      
        const div = document.createElement('div');
        
        div.classList.add('col');
        div.innerHTML = `        
          <div class="card p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>              
            </div>
            <button onclick="loadPhoneDetails('${phone.slug}')"href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
            
          </div>        
        `;
        phonesContainer.appendChild(div);
    })
    toggleSpinner(false)
}

const processSearch = (dataLimit)=>{
  toggleSpinner(true)
  const searchField = document.getElementById('search-field');
  const searchValue = searchField.value;
  loadPhone(searchValue,dataLimit);
}

document.getElementById('btn-search').addEventListener('click', ()=>{
  processSearch(10);

  // document.getElementById('search-field').value = ''
});
document.getElementById('search-field').addEventListener('keypress', (e)=>{
  if(e.key === 'Enter'){
    processSearch(10);
  }
})

const toggleSpinner = isLoading =>{
  const loadSection = document.getElementById('loader');
  if(isLoading){
    loadSection.classList.remove('d-none')
  }
  else{
    loadSection.classList.add('d-none')
  }
};

document.getElementById('show-btn').addEventListener('click', ()=>{
   processSearch();
  //  loadPhone(searchValue,dataLimit)
})

const loadPhoneDetails =async id=>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = phone =>{
  console.log(phone);
  const title = document.getElementById('exampleModalLabel');
  title.innerText = phone.name;
  const phoneDetailsBody = document.getElementById('phone-bodys');
  phoneDetailsBody.innerHTML =`
    <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No ReleaseDate Found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth :'no others'}
  `;
}

// loadPhone()