function Article(props) {
    return(
        <article className={props.className} tabIndex={props.tabIndex} aria-label={props['aria-label']}>
            {props.children}
        </article>
    )
}

export default Article;
