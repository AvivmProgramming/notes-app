const chalk = require('chalk')
const { argv } = require('process')
const yargs = require('yargs')
const notes = require('./notes.js')

//Customize yargs version
yargs.version('1.1.0')

//create add command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder:{
        title:{
            describe:'Note title to remove',
            demandOption:true,
            type: 'string'
        }
    },
    handler(argv) { 
        notes.removeNote(argv.title)
    }
})

//create list command

yargs.command({
    command: 'list',
    describe: 'Listing out all notes',
    handler() {
        notes.listNotes()
    }
})

//create read command

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            description: 'Note title to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

//add, remove, read, list

yargs.parse()