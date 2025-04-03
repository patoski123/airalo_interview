import { Before } from '@badeball/cypress-cucumber-preprocessor';
import {SharedState} from '../../../support/sharedState';

Before(() => {
    SharedState.clear();
});
