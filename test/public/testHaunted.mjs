import { component, html, useState, useEffect } from './haunted.min.mjs';


function MyApp() {
    const [a, setA] = useState(0);

    useEffect(() => {
        setTimeout(() => { setA(a + 1) }, 1000)
    }, [a]);

    return html`
    <h2>Haunted app</h2>
    <div>Hello my app, ${a}</div>
    `
}


customElements.define('my-app', component(MyApp));