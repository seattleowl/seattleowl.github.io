const ajax = async (url, type="json") => {
    let responce = await fetch(url)

    switch (type) {
        case "json":
            return responce.json()
            break
        
        case "text":
            return responce.text()
        
        default:
            throw TypeError("Unknown return type, \"" + type + "\".")
    }
}