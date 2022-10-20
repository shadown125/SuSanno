import { GetServerSideProps, NextPage } from "next";
import { admin } from "../../../schemas/validation/admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18n from "../../../next-i18next.config.mjs";
import { useTranslation } from "next-i18next";
import AdminForm from "../../../components/adminForm/AdminForm";
import { getSuSAuthSession } from "../../server/common/get-server-session";

const Admin: NextPage = () => {
    const { t } = useTranslation("admin");

    return (
        <section className="section admin">
            <div className="wrapper">
                <div className="grid--centered">
                    <div className="container">
                        <div className="content">
                            <h1 className="headline h2">Susanoo</h1>
                            <span>{t("introductionText")}</span>
                            <AdminForm />
                            <span className="account">{t("missingAccount")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSuSAuthSession(ctx);

    if (session) {
        return {
            redirect: {
                destination: `/${ctx.locale}/admin/panel`,
                permanent: false,
            },
        };
    }

    return {
        props: {
            ...(await serverSideTranslations(ctx.locale!, ["common", "admin"], i18n)),
            session,
        },
    };
};
