const space= document.getElementById("color-space")
const id=[]
document.addEventListener('click', function(e){
    if(e.target.id==="get-scheme"){
        render()
    }
    else if(e.target.dataset.codHex){
        copy(e.target.dataset.codHex)
    }
    else if(e.target.dataset.blockHex){
        copy(e.target.dataset.blockHex)
    }
})

function render(){
    document.getElementById("color-space").innerHTML=""
    const mode=document.getElementById("modes").value.toLowerCase()
    const color=document.getElementById("color").value.slice(1)
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
        .then(res => res.json())
        .then(res => {
            res.colors.forEach((color)=>{
                document.getElementById("color-space").innerHTML+=`
                    <div>
                        <div data-block-hex=${color.hex.clean} style="background-color:${color.hex.value}">
                        </div>
                        <p data-cod-hex=${color.hex.clean} id=${color.hex.clean}>${color.hex.value}</p>
                    </div>
                    `
                })
        })
}

function copy(id){
    const copyText = document.getElementById(id)
    navigator.clipboard
        .writeText(copyText.textContent)
        .then(() => {
            alert("successfully copied");
        })
        .catch(() => {
            alert("something went wrong");
        })
}