export const getContacts = store => store.items;
export const getFilteredContacts = ({contacts}) => {
    const { items, filter } = contacts;
    if(!filter) {
        return items;
    }

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = items.filter(({name}) => {
        const normalizedName = name.toLowerCase();
        const result = normalizedName.includes(normalizedFilter);
        return result;
    })
    return filteredContacts;
}