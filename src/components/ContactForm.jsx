import React, { useState, useRef } from "react";
import s from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/contacts/contactsOperations";
import { getItems } from "../redux/contacts/contactsSelector";
import toast from "react-hot-toast";
import { langOptions } from "../assets/langOptions";
import { getLang } from "../redux/lang/langSelector";

function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const dispatch = useDispatch();
  const items = useSelector(getItems);

  const lang = useSelector(getLang);

  const nameInputId = useRef(nanoid());
  const numberInputId = useRef(nanoid());

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = {
      name,
      number,
    };
    if (items.some((el) => el.name.includes(newObj.name) === true)) {
      toast.error(name + " is already in contacts");
      reset();
    } else {
      console.log("newObj", newObj);
      dispatch(addContact(newObj));
      toast.success(name + " adds to contacts");
      reset();
    }
  };
  const reset = () => {
    setName("");
    setNumber("");
  };

  const { title, phone, button } = langOptions.contactsFormOptions;

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label} htmlFor={nameInputId.current}>
          {title[lang]}
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters"
            onChange={handleChange}
            id={nameInputId}
            required
          />
        </label>
        <label className={s.label} htmlFor={numberInputId.current}>
          {phone[lang]}
          <input
            className={s.input}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits "
            onChange={handleChange}
            id={numberInputId}
          />
        </label>
        <button className={s.formBtn} type="submit" disabled={!number && !name}>
          {button[lang]}
        </button>
      </form>
    </>
  );
}

export default ContactForm;
