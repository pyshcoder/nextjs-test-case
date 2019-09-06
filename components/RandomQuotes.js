import styled from 'styled-components'

const Quote = styled.blockquote`
  font-size: 1.4em;
  width: 60%;
  margin-bottom: 50px;
  font-family: Open Sans;
  font-style: italic;
  color: #555555;
  padding: 1.2em 30px 1.2em 75px;
  border-left: 8px solid #78F0AF;
  line-height: 1.6;
  position: relative;
  background: #EDEDED;

  span {
    display: block;
    color: #333333;
    font-style: normal;
    font-weight: bold;
    margin-top: 1em;
  }
`

const API_URL = '/api/quotes'
const FACTS = 10

export default class RandomQuotes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      quotes: []
    }

    this.loadQuotes = this.loadQuotes.bind(this)
  }

  async loadQuotes() {
    this.setState({ loading: true })
    const response = await fetch(API_URL)
    const quotes = await response.json()

    this.setState({
      loading: false,
      quotes: quotes.quotes
    })
  }

  componentDidMount() {
    this.loadQuotes()
  }

  render() {
    let quotes = 'Quotes loading...';

    if(!this.state.loading) {
      quotes = this.state.quotes.map((quote, idx) => {
        return (
          <Quote key={idx}>
            {quote.quote}
            <span>Author: {quote.author ? quote.author : 'Unknown'}</span>
          </Quote>
        )
      })
    }

    return (
      <div>
        <h1>Random quotes</h1>
        {!this.state.loading && <button onClick={this.loadQuotes}>Reload</button>}
        {quotes}
      </div>
    )
  }
}
