# Hyclass

> A tiny (162b gzip) utility for hydrating className strings.

Hyclass (short for "Hydrate class") is a small utility that makes it simple to abstract away longer className combinations by providing shorter aliases and then hydrating them.

It essentially works by taking one class `btn` and replacing it with a longer class `block text-center rounded-lg bg-blue-500 text-white`.

## Install

NPM:
```
$ npm install --save hyclass
```

Yarn:
```
$ yarn add hyclass
```

## Basic usage

Hyclass is great for making component "variants". First, create your hydrator containing all your variants. Then add it to your button to hydrate incoming classNames.

**Button.js**

```js
import hyclass from "hyclass";

const btnHydrator = hyclass({
  btn: 'block text-center rounded-lg',
  sm: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
  primary: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300',
  outline: 'text-gray-900 bg-white hover:bg-gray-100  border border-gray-300'
});

export default function Button = ({className, children}) => {
  return (
    <button 
      type="button" 
      className={btnHydrator(className)}
    >
      {children}
    </button>
  )
}
```
Then you can use your className aliases to style all your button variants.

**YourComponent.js**

```js
import Button from "./Button";

export default function YourComponent = () => {
  return <div>
    <Button className='btn sm outline'>Small outline button</Button>
    <Button className='btn sm primary'>Small primary button</Button>
    <Button className='btn lg outline'>Large outline button</Button>
    <Button className='btn lg primary'>Large primary button</Button>
  </div>
}
```

## External hydrators
You can export your hydrators from a separate file to use them anywhere in your solution.

**hydrators.js**
```js
export const btnHydrator = hyclass({
    btn: 'block text-center rounded-lg',
    sm: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
    primary: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300',
    outline: 'text-gray-900 bg-white hover:bg-gray-100  border border-gray-300'
})

export const textHydrator = hyclass({
    h1: 'font-extrabold text-3xl md:text-4xl lg:text-5xl',
    h2: 'font-bold text-2xl md:text-3xl lg:text-4xl',
    h3: 'font-medium text-xl md:text-2xl lg:text-3xl',
    h4: 'font-medium text-lg md:text-xl lg:text-2xl',
})
```
**YourComponent.js**
```js
import { textVariants, btnVariants } from './hydrators';

export default function YourComponent = () => {
  return <div>
    <h1 className={textHydrator('h1')}>Lorem Ipsum</h1>
    <button className={btnHydrator('btn sm outline')}>Click me</button>
  </div>
}
```

## Respects additional classnames

Hyclass only replaces classes provided in the hydrator object, any additional classes are still applied.

```js

const hydrator = hyclass({
  padding: 'py-2',
})

<p className={hydrator('padding my-2')}></p>

// Results in:
<p className='py-2 my-2'></p>
```