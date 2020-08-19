const collapsableItemsHeading = document.getElementsByClassName("repertoire__item--heading");

const collapse = () => {
  // looping through all the collapsible items
  for (let itemHeading of collapsableItemsHeading) {
    itemHeading.addEventListener('click', () => {
      itemHeading.parentNode.classList.toggle('close');
      const content = itemHeading.nextElementSibling;
      content.style.maxHeight = content.style.maxHeight ? null : `${content.scrollHeight}px`;
      // Making all expanded items close when opening a collapsed one: accordion style  
      for (let item2 of collapsableItemsHeading) {
        if (item2 !== itemHeading && !item2.parentNode.classList.contains('close')) {
          item2.parentNode.classList.add('close');
          const content2 = item2.nextElementSibling;
          content2.style.maxHeight = content2.style.maxHeight ? null : `${content2.scrollHeight}px`;
        }
      }
      // Below isn't compatible with the css transition and makes for some random top position
      // setTimeout(() =>
      //   itemHeading.scrollIntoView(), 500
      // )
    })
  }
}

export function collapseFnc() {
  collapse()
} 
