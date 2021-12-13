import React, { useContext, useState, useEffect } from 'react'
import Context from '../store/Context'


function InputBoxes({ input }) {
    const { state } = useContext(Context)

    let stream = state.input.filter(e => e[0] !== '')
    for (var i = 0; i < stream.length; i++)
        stream[i] = [stream[i][0], stream[i][1], state.output[i]]

    stream = stream.reverse()

    if (input !== undefined)
        stream = input

    return (
        <div style={{ marginLeft: 'auto', marginRight: 'auto',  paddingRight: 10, width: '90%', border: 0, overflowX: 'auto', display: 'flex', flexDirection: 'row-reverse' }}>
            <table id="inputbox" style={{ boxShadow: '2px 5px 5px #333', marginBottom: 10, color: 'black' }}>
                <tbody  >

                    {stream.map((value, index) => {
                        return (
                            <>
                                <td style={{ padding: 0, backgroundColor: value[1] }}>
                                    <tr>
                                        <td style={{ padding: 10, paddingBottom: 5, border: 0, alignSelf: 'bottom', height: 20 }} key={index + 1} > {value[0]} </td>
                                    </tr>
                                    <tr>
                                        {(value[2] !== null && value[2] !== '') ?
                                            <td style={{ padding: 0, height: 20, border: 0, backgroundColor: 'white', fontSize: 'small', align: 'bottom', height: 15 }} key={index + 1} > {value[2]} </td>
                                            : <td style={{ padding: 0, height: 20, border: 0, backgroundColor: value[1], fontSize: 'small', align: 'bottom', height: 15 }} key={index + 1} > &nbsp; </td>}
                                    </tr>
                                </td>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default InputBoxes