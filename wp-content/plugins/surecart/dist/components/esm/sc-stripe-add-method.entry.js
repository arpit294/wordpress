import { r as registerInstance, h } from './index-25e5af33.js';
import { p as pure } from './pure-963214cb.js';
import './fetch-cdff67be.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import { a as apiFetch } from './index-824c562b.js';
import './remove-query-args-938c53ea.js';

const scStripeAddMethodCss = "sc-stripe-add-method{display:block}sc-stripe-add-method [hidden]{display:none}.loader{display:grid;height:128px;gap:2em}.loader__row{display:flex;align-items:flex-start;justify-content:space-between;gap:1em}.loader__details{display:grid;gap:0.5em}";
const ScStripeAddMethodStyle0 = scStripeAddMethodCss;

const ScStripeAddMethod = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.liveMode = true;
        this.customerId = undefined;
        this.successUrl = undefined;
        this.loading = undefined;
        this.loaded = undefined;
        this.error = undefined;
        this.paymentIntent = undefined;
    }
    componentWillLoad() {
        this.createPaymentIntent();
    }
    async handlePaymentIntentCreate() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        // we need this data.
        if (!((_c = (_b = (_a = this.paymentIntent) === null || _a === void 0 ? void 0 : _a.processor_data) === null || _b === void 0 ? void 0 : _b.stripe) === null || _c === void 0 ? void 0 : _c.publishable_key) || !((_f = (_e = (_d = this.paymentIntent) === null || _d === void 0 ? void 0 : _d.processor_data) === null || _e === void 0 ? void 0 : _e.stripe) === null || _f === void 0 ? void 0 : _f.account_id))
            return;
        // check if stripe has been initialized
        if (!this.stripe) {
            try {
                this.stripe = await pure.loadStripe((_j = (_h = (_g = this.paymentIntent) === null || _g === void 0 ? void 0 : _g.processor_data) === null || _h === void 0 ? void 0 : _h.stripe) === null || _j === void 0 ? void 0 : _j.publishable_key, { stripeAccount: (_m = (_l = (_k = this.paymentIntent) === null || _k === void 0 ? void 0 : _k.processor_data) === null || _l === void 0 ? void 0 : _l.stripe) === null || _m === void 0 ? void 0 : _m.account_id });
            }
            catch (e) {
                this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Stripe could not be loaded', 'surecart');
                // don't continue.
                return;
            }
        }
        // load the element.
        // we need a stripe instance and client secret.
        if (!((_q = (_p = (_o = this.paymentIntent) === null || _o === void 0 ? void 0 : _o.processor_data) === null || _p === void 0 ? void 0 : _p.stripe) === null || _q === void 0 ? void 0 : _q.client_secret) || !this.container) {
            console.warn('do not have client secret or container');
            return;
        }
        // get the computed styles.
        const styles = getComputedStyle(document.body);
        // we have what we need, load elements.
        this.elements = this.stripe.elements({
            clientSecret: (_t = (_s = (_r = this.paymentIntent) === null || _r === void 0 ? void 0 : _r.processor_data) === null || _s === void 0 ? void 0 : _s.stripe) === null || _t === void 0 ? void 0 : _t.client_secret,
            appearance: {
                variables: {
                    colorPrimary: styles.getPropertyValue('--sc-color-primary-500'),
                    colorText: styles.getPropertyValue('--sc-input-label-color'),
                    borderRadius: styles.getPropertyValue('--sc-input-border-radius-medium'),
                    colorBackground: styles.getPropertyValue('--sc-input-background-color'),
                    fontSizeBase: styles.getPropertyValue('--sc-input-font-size-medium'),
                },
                rules: {
                    '.Input': {
                        border: styles.getPropertyValue('--sc-input-border'),
                    },
                    '.Input::placeholder': {
                        color: styles.getPropertyValue('--sc-input-placeholder-color'),
                    },
                },
            },
        });
        // create the payment element.
        this.elements
            .create('payment', {
            wallets: {
                applePay: 'never',
                googlePay: 'never',
            },
        })
            .mount('.sc-payment-element-container');
        this.element = this.elements.getElement('payment');
        this.element.on('ready', () => (this.loaded = true));
    }
    async createPaymentIntent() {
        try {
            this.loading = true;
            this.error = '';
            this.paymentIntent = await apiFetch({
                method: 'POST',
                path: 'surecart/v1/payment_intents',
                data: {
                    processor_type: 'stripe',
                    live_mode: this.liveMode,
                    customer_id: this.customerId,
                    refresh_status: true,
                },
            });
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    /**
     * Handle form submission.
     */
    async handleSubmit(e) {
        var _a;
        e.preventDefault();
        this.loading = true;
        try {
            const confirmed = await this.stripe.confirmSetup({
                elements: this.elements,
                confirmParams: {
                    return_url: addQueryArgs(this.successUrl, {
                        payment_intent: (_a = this.paymentIntent) === null || _a === void 0 ? void 0 : _a.id,
                    }),
                },
                redirect: 'always',
            });
            if (confirmed === null || confirmed === void 0 ? void 0 : confirmed.error) {
                this.error = confirmed.error.message;
                throw confirmed.error;
            }
        }
        catch (e) {
            console.error(e);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
            this.loading = false;
        }
    }
    render() {
        return (h("sc-form", { key: '4e01e08417fcf9fc03a8bbfae6d37820cd02f100', onScFormSubmit: e => this.handleSubmit(e) }, this.error && (h("sc-alert", { key: 'e3fa40fcaf9bf7dad482c173f56d1988c2a1e3a3', open: !!this.error, type: "danger" }, h("span", { key: 'f00e2838bee0e7bada741582c226138b3d6f98ea', slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), h("div", { key: '10d92e94c031a3b461a62e85a45ce1319a50c2b3', class: "loader", hidden: this.loaded }, h("div", { key: '611188c402718eb677aecd542c94cd24ee6cd2ee', class: "loader__row" }, h("div", { key: 'b7ef6295d36c731acebd54c2362aece60e31070f', style: { width: '50%' } }, h("sc-skeleton", { key: '273535244b582b9abb9b755779f039833f880dab', style: { width: '50%', marginBottom: '0.5em' } }), h("sc-skeleton", { key: '3185f71444908fb9a76962e8fc5c7b93e73a0ac7' })), h("div", { key: 'aeb7db03f2973a161c618ad90ad42e300b3ad465', style: { flex: '1' } }, h("sc-skeleton", { key: '199782eae2098b3bdc5da92fe127d4f09dded47b', style: { width: '50%', marginBottom: '0.5em' } }), h("sc-skeleton", { key: '30eb47923704b6459efa648375b58ed86acc1698' })), h("div", { key: '7783c5b204d5339c79c812f534e6014eef2cebdf', style: { flex: '1' } }, h("sc-skeleton", { key: 'de69dc68ebaaf17aaf90375062d1dee623067020', style: { width: '50%', marginBottom: '0.5em' } }), h("sc-skeleton", { key: '3fb3ac449848d63d5b1d27df0dfda50abda00cb5' }))), h("div", { key: '591bd157598f3794d907bf279c59fa5b93ffb72f', class: "loader__details" }, h("sc-skeleton", { key: 'cfa1052c5c626668401ca8e5f18fb286d3f03800', style: { height: '1rem' } }), h("sc-skeleton", { key: 'b24a28d7e118e5ce919ead0031da3584124cb208', style: { height: '1rem', width: '30%' } }))), h("div", { key: '84b81f5a6d9acd51e770b0295da8734bc5888c3b', hidden: !this.loaded, class: "sc-payment-element-container", ref: el => (this.container = el) }), h("sc-button", { key: '59f93a9cd4c61eaa9d83f8dd447f811f813f7562', type: "primary", submit: true, full: true, loading: this.loading }, wp.i18n.__('Save Payment Method', 'surecart'))));
    }
    static get watchers() { return {
        "paymentIntent": ["handlePaymentIntentCreate"]
    }; }
};
ScStripeAddMethod.style = ScStripeAddMethodStyle0;

export { ScStripeAddMethod as sc_stripe_add_method };

//# sourceMappingURL=sc-stripe-add-method.entry.js.map