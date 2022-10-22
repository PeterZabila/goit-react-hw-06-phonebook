export const getContacts = store => store.contacts;
export const getFilteredContacts = ({filter, contacts}) => {
    console.log(filter);
    if(!filter) {
        return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({name}) => {
        const normalizedName = name.toLowerCase();
        const result = normalizedName.includes(normalizedFilter);
        return result;
    })
    return filteredContacts;
}