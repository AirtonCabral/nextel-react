import React from 'react'
import { mount } from 'enzyme'
import { ProppedMap } from 'components/map'
import { Marker } from 'react-google-maps'
import renderer from 'react-test-renderer'

// FIXME:
// Google Maps renderiza assincronamente, o que torna o teste unitário impossível.
// Mock?x
describe('ProppedMap', () => {
    const props = {
        select: () => {},
    }
    it('Renderiza corretamente com localizações', () => {
        const locations = [
            {lat: -23.008974, lng: -43.296455, title: 'Dr. Felipe Cunha', type: 'Cardiologista'},
            {lat: -23.009334, lng: -43.295255, title: 'Dra. Elzira Nunes', type: 'Endocrinologista'},
            {lat: -23.010189, lng: -43.294335, title: 'Dr. Fábio Enúncio', type: 'Alergista'},
        ]

        const tree = renderer.create(<ProppedMap { ...props } locations={locations}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})