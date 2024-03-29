import { defineStore } from "pinia";

export const useContactStore = defineStore("contacts", {
  state: () => ({
    formData: {
      formType: "contact",
      formName: "Add Contact",
      inputFields: [
        {
          name: "name",
          type: "text",
          labelName: "Name",
        },
        {
          name: "phone",
          type: "number",
          labelName: "Phone",
        },
        {
          name: "country",
          type: "select",
          labelName: "Country",
          items: ["India", "Russia", "UAE", "UK", "Japan"],
        },
      ],
    },
    editingContact: null,
    contactsArr: [],
    isOpen: false,
  }),

  actions: {
    fetchContacts() {
      const storedContacts = localStorage.getItem("contactsDB");
      this.contactsArr = storedContacts ? JSON.parse(storedContacts) : [];
    },

    addContact(formData) {
      const newContact = {
        ...formData,
        id: Math.floor(100000 + Math.random() * 900000),
      };
      this.contactsArr.push(newContact);
      localStorage.setItem("contactsDB", JSON.stringify(this.contactsArr));
    },

    editContact(data) {
      this.editingContact = data;
    },

    updateContact(index, updatedContact) {
      this.contactsArr.splice(index, 1, updatedContact);
      localStorage.setItem("contactsDB", JSON.stringify(this.contactsArr));
    },

    deleteContact(index) {
      this.contactsArr.splice(index, 1);
      localStorage.setItem("contactsDB", JSON.stringify(this.contactsArr));
    },

    setOpenModal(value) {
      this.isOpen = value;
    },

    setFormName(name) {
      this.formData.formName = name;
    },

    resetFormName(name) {
      this.formData.formName = name;
    },
  },

  mutation: {
    setEditingContact(contact) {
      this.editingContact = contact;
    },
  },
});
