const Container = ({children, className}) => {
    return <section className={`mx-auto max-w-7xl px-4 py-5 ${className}`}>
        {children}
    </section>;
}

export default Container;