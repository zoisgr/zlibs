import { component, html, useState, useEffect } from './haunted.min.mjs';

console.log('Hello world');


function MyApp() {
    const [a, setA] = useState(0);

    useEffect(() => {
        setTimeout(() => { setA(a + 1) }, 1000)
    }, [a]);

    return html`<div>Hello my app, ${a}</div>`
}


customElements.define('my-app', component(MyApp));