const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const removedNotes= notes.filter((note) => note.title !== title)

    if(removedNotes.length < notes.length)
    {
        saveNotes(removedNotes)
        console.log(chalk.bgGreen('Note removed Successfuly!'))

    } else {
        console.log(chalk.bgRed('No note found!'))
    }

}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteReading = notes.find((note) => note.title === title)

    if(noteReading){
        console.log(chalk.inverse(noteReading.title))
        console.log(noteReading.body)
    } else {
        console.log(chalk.red('Error! No note found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
         return JSON.parse(dataJson)
    } catch(e){
        return []
    }


}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}