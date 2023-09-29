const rupiah = (input) => {
    return input.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })
}

module.exports = rupiah