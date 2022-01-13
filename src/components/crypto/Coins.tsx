/* eslint-disable jsx-a11y/alt-text */
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../../api";
import Loader from "./Loader";
import Navigator from "../Navigator";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 26px;
  margin: 20px 0;
`;
const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  margin: 10px 0;
`;
const Coin = styled.li`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardColor};
  margin: 0px 5px 10px 5px;
  border-radius: 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 10px;

    span {
      margin-left: 7px;
      color: ${(props) => props.theme.accentColor};
      font-size: 9px;
    }
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  /* 
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); 
  */
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <>
      <Navigator />
      <Container>
        <Helmet>
          <title>Crypto Tracker</title>
        </Helmet>
        <Header>
          <Title>Crypto</Title>
        </Header>
        {isLoading ? (
          <Loader />
        ) : (
          <CoinsList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/react/crypto_tracker/${coin.id}/price`,
                    state: { name: coin.name },
                  }}
                >
                  <Icon
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name}
                  <span>{coin.symbol}</span>
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}

export default Coins;
