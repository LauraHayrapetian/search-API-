import './pagination.scss'

export default function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            
                <ul>
                    {pageNumbers.map(number => {
                        return (
                            <li key={number} onClick={() => paginate(number)}
                                className={currentPage == number ? 'active' : ''}
                            >
                                {number}
                            </li>
                        )
                    })}
                </ul>
        </>
    )
}