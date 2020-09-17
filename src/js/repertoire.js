export class Collapse {

  collapsing() {
    const collapsableItemsHeading = document.querySelectorAll('.repertoire-item__heading');
    for (let itemHeading of collapsableItemsHeading) {
      itemHeading.addEventListener('click', () => {
        itemHeading.parentNode.classList.toggle('close');
        const content = itemHeading.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : `${content.scrollHeight}px`;
        // Making all expanded items close when opening a collapsed one: accordion style  
        for (let item2 of collapsableItemsHeading) {
          if (item2 !== itemHeading && !item2.parentNode.classList.contains('close')) {
            const content2 = item2.nextElementSibling;
            item2.parentNode.classList.add('close');
            content2.style.maxHeight = content2.style.maxHeight ? null : `${content2.scrollHeight}px`;
          }
        }
      })
    }
  }
}
