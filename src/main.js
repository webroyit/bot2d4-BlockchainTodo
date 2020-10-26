App = {
    load: async () => {
        console.log("It loading")
    }
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})