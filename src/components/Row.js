import Cell from './Cell.js';
import propTypes from 'prop-types';
import styled from 'styled-components';

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    margin: 0;
`;

const Row = props => {
    const cells = props.cells.map((el, i) => {
        return (
            <Cell 
                key={'col' + i} 
                row={props.row}
                col={i}
                cell={el}
                player={props.player}
                win={props.win}
                turn={props.player}
                handleFire={props.handleFire}
                dev={props.dev}
            />
        )
    })
    return (
        <RowContainer>
            {cells}
        </RowContainer>
    );
};

Row.propTypes = {
    cells: propTypes.arrayOf(propTypes.object).isRequired,
    player: propTypes.string.isRequired,
    win: propTypes.any.isRequired,
    turn: propTypes.string.isRequired,
    handleFire: propTypes.func.isRequired
}; 

export default Row;