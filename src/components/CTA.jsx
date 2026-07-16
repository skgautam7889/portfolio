
import Button from "./common/Button";

const CTA = () => {
    return (
        <section className="section-cta">
            <div className="container text-center">
                <h2>
                    Ready to build something{' '}
                    <span style={{ color: 'var(--color-text-primary)' }}>amazing</span>?
                </h2>
                <p style={{ maxWidth: '500px', margin: '12px auto 24px', fontSize: '1.05rem' }}>
                    Let's collaborate and create something extraordinary together.
                </p>
                <Button href="#contact" variant="primary" size="lg">
                    Let's Talk
                </Button>
            </div>
        </section>
    )
}
export default CTA;