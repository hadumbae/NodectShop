import {FC} from 'react';
import {Collapsible} from "@/components/ui/collapsible.tsx";
import ProductFilterTitleCard from "@/components/product/product/filter/product.filter.title.card.tsx";
import ProductFilterHasSKUCard from "@/components/product/product/filter/product.filter.has.sku.card.tsx";
import ProductFilterTypesAndTags from "@/components/product/product/filter/product.filter.types.tags.tsx";
import {useIsMobile} from "@/hooks/use-mobile.tsx";
import {Sidebar} from "@/components/ui/sidebar.tsx";

interface Props {
    setTitle: (title: string) => void;
    setHasSKU: (value: string) => void;
    setTags: (tags: string) => void;
    setTypes: (types: string) => void;
}

const ProductFilterList: FC<Props> = ({setTitle, setHasSKU, setTags, setTypes}) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <div>
            <ProductFilterHasSKUCard setChange={setHasSKU} />
        </div>
    }

    return (
        <div className="space-y-2">
            <ProductFilterTitleCard setTitle={setTitle} />
            <ProductFilterHasSKUCard setChange={setHasSKU} />
            <ProductFilterTypesAndTags setTags={setTags} setTypes={setTypes} />
        </div>
    );
};

export default ProductFilterList;
