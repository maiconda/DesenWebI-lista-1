const getImage = () => {
    const height = document.getElementById('height').value;
    const width = document.getElementById('width').value;
    let images = document.querySelector('input[name="images"]:checked');

    if (height.toString().length === 0 || width.toString().length === 0 || images === null) {
        alert("Por favor, preencha todos os campos e selecione uma quantidade de imagens.");
    } else {
        images = images.value;
        console.log("Height:", height);
        console.log("Width:", width);
        console.log("Selected images:", images);

        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = '';
    
        for (let i = 0; i < images; i++) {
            fetch(`https://picsum.photos/${width}/${height}`)
                .then(response => {

                const div = document.createElement('div');
                div.classList.add('image');

                const imgDiv = document.createElement('div');

                const img = document.createElement('img');
                img.src = response.url;
                img.alt = `Image ${i + 1}`;

                const btnCopy = document.createElement('button');
                btnCopy.innerText = 'Copiar Endereço';
                btnCopy.onclick = () => {
                    navigator.clipboard.writeText(response.url)
                        .then(() => alert('Imagem copiada para a área de transferência'))
                        .catch(err => console.error('Erro ao copiar imagem:', err));
                };

                const btnLink = document.createElement('a');
                btnLink.innerText = 'Compartilhar pelo whatsapp';
                btnLink.href = `https://wa.me/5549999365333?text=${response.url}`;
                btnLink.target = '_blank';

                imgDiv.appendChild(img)
                div.appendChild(imgDiv);
                div.appendChild(btnCopy);
                div.appendChild(btnLink);

                imageContainer.appendChild(div);
                })
                .catch(error => console.error('Erro ao carregar a imagem:', error));
        }
    }
}