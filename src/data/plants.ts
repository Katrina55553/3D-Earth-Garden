export interface PlantData {
  id: string;
  name: string;
  latinName: string;
  latitude: number;
  longitude: number;
  continent: string;
  vegetationType: string;
  climateFeature: string;
  modelPath: string;
  description: string;
}

const plants: PlantData[] = [
  // ========== 桂花 (8 locations) ==========
  { id: "osmanthus-01", name: "桂花", latinName: "Osmanthus fragrans", latitude: 30.2, longitude: 120.2, continent: "亚洲", vegetationType: "常绿灌木/小乔木", climateFeature: "亚热带季风气候", modelPath: "/models/osmanthus.glb", description: "桂花是中国传统十大名花之一，花小而有浓香，秋季开花。" },
  { id: "osmanthus-02", name: "桂花", latinName: "Osmanthus fragrans", latitude: 31.2, longitude: 121.5, continent: "亚洲", vegetationType: "常绿灌木/小乔木", climateFeature: "亚热带季风气候", modelPath: "/models/osmanthus.glb", description: "桂花在中国南方广泛栽培，是重要的香料植物。" },
  { id: "osmanthus-03", name: "桂花", latinName: "Osmanthus fragrans", latitude: 25.0, longitude: 121.5, continent: "亚洲", vegetationType: "常绿灌木/小乔木", climateFeature: "亚热带季风气候", modelPath: "/models/osmanthus.glb", description: "桂花在台湾也有广泛分布，常用于制作桂花茶。" },
  { id: "osmanthus-04", name: "桂花", latinName: "Osmanthus fragrans", latitude: 35.7, longitude: 139.7, continent: "亚洲", vegetationType: "常绿灌木/小乔木", climateFeature: "亚热带季风气候", modelPath: "/models/osmanthus.glb", description: "桂花在日本被称为金木犀，是秋季的象征。" },
  { id: "osmanthus-05", name: "桂花", latinName: "Osmanthus fragrans", latitude: 37.5, longitude: 127.0, continent: "亚洲", vegetationType: "常绿灌木/小乔木", climateFeature: "亚热带季风气候", modelPath: "/models/osmanthus.glb", description: "桂花在韩国也广泛种植，用作庭院观赏。" },
  { id: "osmanthus-06", name: "桂花", latinName: "Osmanthus fragrans", latitude: 26.0, longitude: 119.3, continent: "亚洲", vegetationType: "常绿灌木/小乔木", climateFeature: "亚热带季风气候", modelPath: "/models/osmanthus.glb", description: "福建省盛产桂花，多用于制作桂花糕和花茶。" },
  { id: "osmanthus-07", name: "桂花", latinName: "Osmanthus fragrans", latitude: 29.5, longitude: 106.5, continent: "亚洲", vegetationType: "常绿灌木/小乔木", climateFeature: "亚热带季风气候", modelPath: "/models/osmanthus.glb", description: "重庆、四川一带桂花树遍布街巷，秋日满城飘香。" },
  { id: "osmanthus-08", name: "桂花", latinName: "Osmanthus fragrans", latitude: 23.1, longitude: 113.3, continent: "亚洲", vegetationType: "常绿灌木/小乔木", climateFeature: "亚热带季风气候", modelPath: "/models/osmanthus.glb", description: "广州气候温暖湿润，桂花四季常绿。" },

  // ========== 桉树 (8 locations) ==========
  { id: "eucalyptus-01", name: "桉树", latinName: "Eucalyptus", latitude: -33.8, longitude: 151.0, continent: "大洋洲", vegetationType: "常绿乔木", climateFeature: "温带到亚热带气候", modelPath: "/models/eucalyptus.glb", description: "桉树是澳大利亚代表性树种，生长迅速，适应性强。" },
  { id: "eucalyptus-02", name: "桉树", latinName: "Eucalyptus", latitude: -37.8, longitude: 145.0, continent: "大洋洲", vegetationType: "常绿乔木", climateFeature: "温带到亚热带气候", modelPath: "/models/eucalyptus.glb", description: "墨尔本周边桉树林广布，是考拉的主要栖息地。" },
  { id: "eucalyptus-03", name: "桉树", latinName: "Eucalyptus", latitude: -27.5, longitude: 153.0, continent: "大洋洲", vegetationType: "常绿乔木", climateFeature: "温带到亚热带气候", modelPath: "/models/eucalyptus.glb", description: "昆士兰州的桉树品种繁多，形成独特的硬叶林景观。" },
  { id: "eucalyptus-04", name: "桉树", latinName: "Eucalyptus", latitude: -35.3, longitude: 149.1, continent: "大洋洲", vegetationType: "常绿乔木", climateFeature: "温带到亚热带气候", modelPath: "/models/eucalyptus.glb", description: "堪培拉周边广泛分布着雪桉和亮果桉。" },
  { id: "eucalyptus-05", name: "桉树", latinName: "Eucalyptus", latitude: -31.9, longitude: 116.0, continent: "大洋洲", vegetationType: "常绿乔木", climateFeature: "温带到亚热带气候", modelPath: "/models/eucalyptus.glb", description: "西澳大利亚的桉树适应了较干旱的气候条件。" },
  { id: "eucalyptus-06", name: "桉树", latinName: "Eucalyptus", latitude: -42.9, longitude: 147.3, continent: "大洋洲", vegetationType: "常绿乔木", climateFeature: "温带到亚热带气候", modelPath: "/models/eucalyptus.glb", description: "塔斯马尼亚的桉树林是世界上最古老的森林之一。" },
  { id: "eucalyptus-07", name: "桉树", latinName: "Eucalyptus", latitude: -23.7, longitude: 133.9, continent: "大洋洲", vegetationType: "常绿乔木", climateFeature: "温带到亚热带气候", modelPath: "/models/eucalyptus.glb", description: "澳洲中部的桉树显示了这种植物惊人的耐旱能力。" },
  { id: "eucalyptus-08", name: "桉树", latinName: "Eucalyptus", latitude: -16.9, longitude: 145.7, continent: "大洋洲", vegetationType: "常绿乔木", climateFeature: "温带到亚热带气候", modelPath: "/models/eucalyptus.glb", description: "凯恩斯附近的桉树林与热带雨林交错生长。" },

  // ========== 毛竹 (7 locations) ==========
  { id: "bamboo-01", name: "毛竹", latinName: "Phyllostachys edulis", latitude: 28.2, longitude: 118.0, continent: "亚洲", vegetationType: "常绿竹类", climateFeature: "亚热带湿润气候", modelPath: "/models/bamboo.glb", description: "毛竹是中国分布最广的竹种，生长速度极快。" },
  { id: "bamboo-02", name: "毛竹", latinName: "Phyllostachys edulis", latitude: 30.5, longitude: 117.0, continent: "亚洲", vegetationType: "常绿竹类", climateFeature: "亚热带湿润气候", modelPath: "/models/bamboo.glb", description: "安徽黄山周边毛竹林连绵成海，蔚为壮观。" },
  { id: "bamboo-03", name: "毛竹", latinName: "Phyllostachys edulis", latitude: 27.0, longitude: 111.0, continent: "亚洲", vegetationType: "常绿竹类", climateFeature: "亚热带湿润气候", modelPath: "/models/bamboo.glb", description: "湖南的竹林资源丰富，竹编工艺传承千年。" },
  { id: "bamboo-04", name: "毛竹", latinName: "Phyllostachys edulis", latitude: 35.0, longitude: 135.8, continent: "亚洲", vegetationType: "常绿竹类", climateFeature: "亚热带湿润气候", modelPath: "/models/bamboo.glb", description: "日本京都的竹林闻名世界，是禅意庭园的经典元素。" },
  { id: "bamboo-05", name: "毛竹", latinName: "Phyllostachys edulis", latitude: 24.5, longitude: 118.5, continent: "亚洲", vegetationType: "常绿竹类", climateFeature: "亚热带湿润气候", modelPath: "/models/bamboo.glb", description: "闽南地区毛竹生长旺盛，是重要的建筑材料。" },
  { id: "bamboo-06", name: "毛竹", latinName: "Phyllostachys edulis", latitude: 32.0, longitude: 118.8, continent: "亚洲", vegetationType: "常绿竹类", climateFeature: "亚热带湿润气候", modelPath: "/models/bamboo.glb", description: "南京紫金山的竹林清幽雅致，四季常青。" },
  { id: "bamboo-07", name: "毛竹", latinName: "Phyllostachys edulis", latitude: 29.0, longitude: 103.0, continent: "亚洲", vegetationType: "常绿竹类", climateFeature: "亚热带湿润气候", modelPath: "/models/bamboo.glb", description: "四川盆地温暖湿润，是毛竹的理想生长地。" },

  // ========== 高山雪莲 (6 locations) ==========
  { id: "snowlotus-01", name: "高山雪莲", latinName: "Saussurea involucrata", latitude: 30.3, longitude: 86.0, continent: "亚洲", vegetationType: "高山草本", climateFeature: "高山寒带气候", modelPath: "/models/snow_lotus.glb", description: "高山雪莲生长于海拔4000米以上的高山流石滩，是珍贵的中药材。" },
  { id: "snowlotus-02", name: "高山雪莲", latinName: "Saussurea involucrata", latitude: 28.0, longitude: 87.0, continent: "亚洲", vegetationType: "高山草本", climateFeature: "高山寒带气候", modelPath: "/models/snow_lotus.glb", description: "珠穆朗玛峰区域是雪莲的典型栖息地之一。" },
  { id: "snowlotus-03", name: "高山雪莲", latinName: "Saussurea involucrata", latitude: 42.0, longitude: 80.0, continent: "亚洲", vegetationType: "高山草本", climateFeature: "高山寒带气候", modelPath: "/models/snow_lotus.glb", description: "天山山脉的雪线附近可见雪莲傲雪绽放。" },
  { id: "snowlotus-04", name: "高山雪莲", latinName: "Saussurea involucrata", latitude: 32.0, longitude: 78.0, continent: "亚洲", vegetationType: "高山草本", climateFeature: "高山寒带气候", modelPath: "/models/snow_lotus.glb", description: "喜马拉雅山脉西段也有雪莲分布。" },
  { id: "snowlotus-05", name: "高山雪莲", latinName: "Saussurea involucrata", latitude: 36.0, longitude: 75.0, continent: "亚洲", vegetationType: "高山草本", climateFeature: "高山寒带气候", modelPath: "/models/snow_lotus.glb", description: "喀喇昆仑山脉的雪莲生长在极端恶劣环境中。" },
  { id: "snowlotus-06", name: "高山雪莲", latinName: "Saussurea involucrata", latitude: 43.5, longitude: 86.5, continent: "亚洲", vegetationType: "高山草本", climateFeature: "高山寒带气候", modelPath: "/models/snow_lotus.glb", description: "新疆天山一号冰川附近有少量雪莲种群。" },

  // ========== 北美红杉 (7 locations) ==========
  { id: "redwood-01", name: "北美红杉", latinName: "Sequoia sempervirens", latitude: 41.5, longitude: -124.0, continent: "北美洲", vegetationType: "常绿乔木", climateFeature: "温带海洋性气候", modelPath: "/models/redwood.glb", description: "北美红杉是世界上最高的树种之一，可达115米。" },
  { id: "redwood-02", name: "北美红杉", latinName: "Sequoia sempervirens", latitude: 40.4, longitude: -124.0, continent: "北美洲", vegetationType: "常绿乔木", climateFeature: "温带海洋性气候", modelPath: "/models/redwood.glb", description: "洪堡红杉州立公园保存着大片原始红杉林。" },
  { id: "redwood-03", name: "北美红杉", latinName: "Sequoia sempervirens", latitude: 37.8, longitude: -122.5, continent: "北美洲", vegetationType: "常绿乔木", climateFeature: "温带海洋性气候", modelPath: "/models/redwood.glb", description: "旧金山附近的穆尔森林是著名的红杉保护区。" },
  { id: "redwood-04", name: "北美红杉", latinName: "Sequoia sempervirens", latitude: 44.0, longitude: -124.0, continent: "北美洲", vegetationType: "常绿乔木", climateFeature: "温带海洋性气候", modelPath: "/models/redwood.glb", description: "俄勒冈州南部沿海也有红杉分布。" },
  { id: "redwood-05", name: "北美红杉", latinName: "Sequoia sempervirens", latitude: 39.0, longitude: -123.5, continent: "北美洲", vegetationType: "常绿乔木", climateFeature: "温带海洋性气候", modelPath: "/models/redwood.glb", description: "门多西诺县的红杉林以雾霭缭绕闻名。" },
  { id: "redwood-06", name: "北美红杉", latinName: "Sequoia sempervirens", latitude: 42.0, longitude: -124.2, continent: "北美洲", vegetationType: "常绿乔木", climateFeature: "温带海洋性气候", modelPath: "/models/redwood.glb", description: "加州与俄勒冈交界处的红杉国家公园连绵不绝。" },
  { id: "redwood-07", name: "北美红杉", latinName: "Sequoia sempervirens", latitude: 36.5, longitude: -121.9, continent: "北美洲", vegetationType: "常绿乔木", climateFeature: "温带海洋性气候", modelPath: "/models/redwood.glb", description: "大苏尔海岸附近的红杉林与太平洋海雾相伴。" },

  // ========== 猴面包树 (7 locations) ==========
  { id: "baobab-01", name: "猴面包树", latinName: "Adansonia digitata", latitude: -20.0, longitude: 45.0, continent: "非洲", vegetationType: "落叶乔木", climateFeature: "热带稀树草原气候", modelPath: "/models/baobab.glb", description: "猴面包树是非洲草原的标志性树种，树干粗壮可储水。" },
  { id: "baobab-02", name: "猴面包树", latinName: "Adansonia digitata", latitude: -19.0, longitude: 46.0, continent: "非洲", vegetationType: "落叶乔木", climateFeature: "热带稀树草原气候", modelPath: "/models/baobab.glb", description: "马达加斯加的猴面包树大道是世界级自然遗产。" },
  { id: "baobab-03", name: "猴面包树", latinName: "Adansonia digitata", latitude: -22.0, longitude: 44.0, continent: "非洲", vegetationType: "落叶乔木", climateFeature: "热带稀树草原气候", modelPath: "/models/baobab.glb", description: "马达加斯加西南部的猴面包树形成了独特景观。" },
  { id: "baobab-04", name: "猴面包树", latinName: "Adansonia digitata", latitude: -6.0, longitude: 35.0, continent: "非洲", vegetationType: "落叶乔木", climateFeature: "热带稀树草原气候", modelPath: "/models/baobab.glb", description: "坦桑尼亚稀树草原上的猴面包树是野生动物的水源。" },
  { id: "baobab-05", name: "猴面包树", latinName: "Adansonia digitata", latitude: 14.0, longitude: -16.0, continent: "非洲", vegetationType: "落叶乔木", climateFeature: "热带稀树草原气候", modelPath: "/models/baobab.glb", description: "塞内加尔的猴面包树在萨赫勒地区顽强生长。" },
  { id: "baobab-06", name: "猴面包树", latinName: "Adansonia digitata", latitude: -17.0, longitude: 25.0, continent: "非洲", vegetationType: "落叶乔木", climateFeature: "热带稀树草原气候", modelPath: "/models/baobab.glb", description: "赞比西河流域的猴面包树是当地文化象征。" },
  { id: "baobab-07", name: "猴面包树", latinName: "Adansonia digitata", latitude: -24.0, longitude: 31.0, continent: "非洲", vegetationType: "落叶乔木", climateFeature: "热带稀树草原气候", modelPath: "/models/baobab.glb", description: "南非克鲁格国家公园的猴面包树为草原增添了壮美。" },

  // ========== 百合 (8 locations) ==========
  { id: "lily-01", name: "百合", latinName: "Lilium", latitude: 45.0, longitude: 4.0, continent: "欧洲", vegetationType: "多年生草本", climateFeature: "温带大陆性气候", modelPath: "/models/lily.glb", description: "百合花大而美丽，是重要的观赏花卉，广泛分布于北半球温带。" },
  { id: "lily-02", name: "百合", latinName: "Lilium", latitude: 48.8, longitude: 2.3, continent: "欧洲", vegetationType: "多年生草本", climateFeature: "温带大陆性气候", modelPath: "/models/lily.glb", description: "法国的鸢尾百合是欧洲园林的经典植物。" },
  { id: "lily-03", name: "百合", latinName: "Lilium", latitude: 51.5, longitude: -0.1, continent: "欧洲", vegetationType: "多年生草本", climateFeature: "温带大陆性气候", modelPath: "/models/lily.glb", description: "英国皇家植物园收藏了上百种百合品种。" },
  { id: "lily-04", name: "百合", latinName: "Lilium", latitude: 42.0, longitude: 12.5, continent: "欧洲", vegetationType: "多年生草本", climateFeature: "温带大陆性气候", modelPath: "/models/lily.glb", description: "意大利的圣母百合是文艺复兴绘画中的经典意象。" },
  { id: "lily-05", name: "百合", latinName: "Lilium", latitude: 55.7, longitude: 12.6, continent: "欧洲", vegetationType: "多年生草本", climateFeature: "温带大陆性气候", modelPath: "/models/lily.glb", description: "北欧夏季漫长日照下百合花开得格外艳丽。" },
  { id: "lily-06", name: "百合", latinName: "Lilium", latitude: 36.0, longitude: 138.0, continent: "亚洲", vegetationType: "多年生草本", climateFeature: "亚热带湿润气候", modelPath: "/models/lily.glb", description: "日本的ヤマユリ是百合属中的珍品，花大而香。" },
  { id: "lily-07", name: "百合", latinName: "Lilium", latitude: 50.4, longitude: 30.5, continent: "欧洲", vegetationType: "多年生草本", climateFeature: "温带大陆性气候", modelPath: "/models/lily.glb", description: "乌克兰的黑土平原上野生百合种类丰富。" },
  { id: "lily-08", name: "百合", latinName: "Lilium", latitude: 44.4, longitude: 8.9, continent: "欧洲", vegetationType: "多年生草本", climateFeature: "温带大陆性气候", modelPath: "/models/lily.glb", description: "意大利里维埃拉的地中海气候适合多种百合生长。" },
];

export default plants;
