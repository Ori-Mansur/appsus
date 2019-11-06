export default{
    getById
}

function getById(){
    return survey
}

var survey =
{
  title: '',
  cmps: [
      {
          type: 'text-note',
          info: {
              label: ''
          }
      },
      {
          type: 'note-todos',
          info: {
              label: '',
              opts: []
          }
      },
      {
          type: 'note-video',
          info: {
              label: '',
              opts: []
          }
      },
      {
          type: 'note-audio',
          info: {
              label: '',
              opts: []
          }
      },
      {
          type: 'note-map',
          info: {
              label: ':',
              max: 5
          }
      },
      {
          type: 'note-img',
          info: {
              label: '',
             
              imgUrl: ''
              
          }
      },

  ]
}