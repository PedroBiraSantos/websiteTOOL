// Okendo Reviews: moves body template children into the page
document.addEventListener('readystatechange',() =>{Array.from(document.getElementById('oke-reviews-body-template')?.content.children)?.forEach(function(child){if(!Array.from(document.body.querySelectorAll('[data-oke-id='.concat(child.getAttribute('data-oke-id'),']'))).length){document.body.prepend(child)}})},{once:true});
