class App {
  constructor() {
    this.notes = [];
    this.title = '';
    this.text = '';
    this.noteID = '';

    this.$form = document.querySelector('#form');
    this.$noteTitle = document.querySelector('#note-title');
    this.$noteText = document.querySelector('#note-text');
    this.$formButtons = document.querySelector('#form-buttons');
    this.$formCloseButton = document.querySelector('#form-close-button');
    this.$placeHolder = document.querySelector('#placeholder');
    this.$notesContainer = document.querySelector('#notes');
    this.$modal = document.querySelector('.modal');
    this.$modalTitle = document.querySelector('.modal-title');
    this.$modalText = document.querySelector('.modal-text');
    this.$modalCloseBtn = document.querySelector('.modal-close-button');

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener('click', event => {
      this.handleFormClick(event);
      this.selectNote(event);
      this.openModal(event);
    });

    // document.body.addEventListener('mouseover', event => {
    //   this.openTooltip(event);
    // })

    this.$form.addEventListener('submit', event => {
      event.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;

      if (title || text) {
        // add notes
        this.addNote({title, text});
      }
    });

    this.$formCloseButton.addEventListener('click', event => {
      event.stopPropagation();
      this.closeForm();
    });

    this.$modalCloseBtn.addEventListener('click', event => {
      event.stopPropagation();
      this.closeModal();
    })
  }

  selectNote(event) {
    const $selectedNote = event.target.closest('.note');
    if (!$selectedNote) return;
    const [$noteTitle, $noteText] = $selectedNote.children;
    this.title = $noteTitle.innerHTML;
    this.text = $noteText.innerHTML;
    this.noteID = $selectedNote.dataset.id;
  }

  openModal(event) {
    if (event.target.closest('.note')) {
      this.$modal.classList.toggle('open-modal');
      this.$modalTitle.value = this.title;
      this.$modalText.value = this.text;
    }
  }

  closeModal() {
    this.editNote();
    this.$modal.classList.toggle('open-modal');
  }

  editNote() {
    const title = this.$modalTitle.value;
    const text = this.$modalText.value;

    // this.notes[Number(this.noteID) - 1].title  = title;
    // this.notes[Number(this.noteID) - 1].text  = text;

    this.notes = this.notes.map( note =>
        note.id === Number(this.noteID) ? {...note, title, text} : note
    );

    this.displayNotes();
  }

  // openTooltip(event) {
  //   if (!event.target.matches('.toolbar-color')) return ;
  // }

  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target);
    const title = this.$noteTitle.value;
    const text = this.$noteText.value;

    if (isFormClicked) {
      this.openForm();
    } else if (title || text) {
      this.addNote({title, text});
    } else {
      this.closeForm();
    }
  }

  openForm() {
    this.$form.classList.add('form-open');
    this.$noteTitle.style.display = 'block';
    this.$formButtons.style.display = 'block';
  }

  closeForm() {
    this.$form.classList.remove('form-open');
    this.$noteTitle.style.display = 'none';
    this.$formButtons.style.display = 'none';
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }

  addNote({title, text}) {
    const newNote = {
      title,
      text,
      color: 'white',
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
    };

    this.notes = [...this.notes, newNote];

    this.displayNotes();
    this.closeForm();
  };

  displayNotes() {
    this.$placeHolder.style.display = this.notes.length > 0 ? 'none' : 'flex';
    this.$notesContainer.innerHTML = this.notes.map(note => `
      <div style="background: ${note.color};" class="note" data-id="${note.id}">
        <div class="${note.title && 'note-title'}">${note.title}</div>
        <div class="note-text">${note.text}</div>
        <div class="toolbar-container">
          <div class="toolbar">
            <img class="toolbar-color" src="https://icon.now.sh/palette">
            <img class="toolbar-delete" src="https://icon.now.sh/delete">
          </div>
        </div>
      </div>`).join("");
  }
}

new App();
