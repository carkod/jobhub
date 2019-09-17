
export default function checkContent (cats, content) { 
    cats.filter(i => {
      for (let cv of content) {
        if (cv.cats.position === i.value && cv.cats.status === 'public')
        return true;
      }
    })
}
        