const mockBooks = Array(10).fill(0).map((_,index) => 
    ({id: index,title: `book${index}`, image: './icon.svg', rating: { average: 0 }})
   )

const mockNullContext = {
    loading: false,
    newBooks: null,
    categoryBooks: null,
    searchResultBooks: null,
    popularBooks: null,
    topRatedBooks: null,
    bestSellingBooks: null,
    authorBooks: null,
    useFetchBooks: jest.fn(),
    handleOpenModal: jest.fn()
}

const mockContext = {
    loading: false,
    newBooks:{total: 10, books: mockBooks},
    categoryBooks: {total: 10, books: mockBooks},
    searchResultBooks: {total: 10, books: mockBooks},
    authorBooks: {total: 10, books: mockBooks},
    popularBooks: mockBooks,
    topRatedBooks: mockBooks,
    bestSellingBooks: mockBooks,
    useFetchBooks: jest.fn(),
    handleOpenModal: jest.fn()
}

const mockLoadingContext = {
    ...mockNullContext,
    loading: true
}

export {
    mockBooks,
    mockContext,
    mockNullContext,
    mockLoadingContext,
}