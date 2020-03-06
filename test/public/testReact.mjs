import { ReactDOM, useState, useEffect, html, Fragment } from './react.mjs';

ReactDOM.render(html`<${MyApp} />`, document.getElementById('react'));

function MyApp() {
    const [a, setA] = useState(0);

    useEffect(() => {
        setTimeout(() => { setA(a + 1) }, 1000)
    }, [a]);

    return html`<${Fragment}>
        <h2>React App</h2>
        <div>Hello my app, ${a}</div>
    </${Fragment}>
    `
}