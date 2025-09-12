export const formatDateAndTime = (dateAndTime)=>{
    const d = new Date(dateAndTime);
    const date = d.toLocaleDateString();
    const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${date} ${time}`;
}