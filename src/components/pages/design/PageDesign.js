export const h1 = ({children, ...props}) => <h1 className="my-4 text-5xl" {...props}>{children}</h1>
export const h2 = ({children, ...props}) => <h2 className="my-2 text-3xl" {...props}>{children}</h2>
export const h3 = ({children, ...props}) => <h3 className="my-2 text-xl" {...props}>{children}</h3>
export const p = ({children, ...props}) => <p className="my-4" {...props}>{children}</p>
export const a = ({children, ...props}) => <a target="_blank" className="underline hover:text-gray-500 inline-block" {...props}>{children}</a>
export const ol = ({children, ...props}) => <ol className="list-decimal ml-14" {...props}>{children}</ol>
export const li = ({children, ...props}) => <li className="" {...props}>{children}</li>